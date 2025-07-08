
# Components Guide — Buttons · Select Menus · Modals

> **TL;DR**  
> • Files live in **`src/components/{buttons,modals,selectmenus}/*/index.ts`**  
> • Each index exports an object with **`id`** (required), optional **`data`**, mandatory **`run`**  
> • String `id` → goes to `exactMap`; RegExp `id` → `regexArr`  
> • Grab builders at runtime via **`componentsPromise`**

```text
src
└─ components
   ├─ buttons
   │  └─ hello
   │     └─ index.ts
   ├─ selectmenus
   │  └─ role-picker
   │     └─ index.ts
   └─ modals
      └─ feedback
         └─ index.ts
```

---

## 1 · Component interface

```ts
import { Component } from '@/types';

export default {
  id: 'string' | /regex/,           // required
  data?: ButtonBuilder | ModalBuilder | RoleSelectMenuBuilder,
  run: (interaction) => Promise<void>,  // required
  devOnly?: boolean,
  test?:    boolean,
} as Component<ExactInteraction, ExactBuilder>;
```

---

## 2 · Fixed‑ID examples

### 2.1 Hello button

```ts
// src/components/buttons/hello/index.ts
import {
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  ActionRowBuilder,
  MessageFlags,
} from 'discord.js';
import { Component } from '@/types';

export default {
  id: 'hello',
  data: new ButtonBuilder()
    .setCustomId('hello')
    .setLabel('Say Hi')
    .setStyle(ButtonStyle.Primary),

  async run(i: ButtonInteraction) {
    await i.reply({ content: '👋 Hi there!', flags: MessageFlags.Ephemeral });
  },
} as Component<ButtonInteraction, ButtonBuilder>;
```

Usage inside a command:

```ts
const { exactMap } = await componentsPromise;
const helloBtn = exactMap.get('hello')!.data as ButtonBuilder;

await interaction.reply({
  content: 'Press the button ↓',
  components: [
    new ActionRowBuilder<ButtonBuilder>().addComponents(helloBtn),
  ],
});
```

### 2.2 Feedback modal

```ts
// src/components/modals/feedback/index.ts
import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalSubmitInteraction,
  MessageFlags,
} from 'discord.js';
import { Component } from '@/types';

const modal = new ModalBuilder()
  .setCustomId('feedback')
  .setTitle('Feedback')
  .addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(
      new TextInputBuilder()
        .setCustomId('fb')
        .setLabel('Your feedback')
        .setStyle(TextInputStyle.Paragraph),
    ),
  );

export default {
  id: 'feedback',
  data: modal,

  async run(i: ModalSubmitInteraction) {
    const txt = i.fields.getTextInputValue('fb');
    await i.reply({ content: 'Thanks!', flags: MessageFlags.Ephemeral });
  },
} as Component<ModalSubmitInteraction, ModalBuilder>;
```

Trigger:

```ts
await interaction.showModal(
  (await componentsPromise).exactMap.get('feedback')!.data as ModalBuilder,
);
```

---

## 3 · RegExp‑ID example

```ts
// src/components/buttons/todo/index.ts
import {
  ButtonBuilder,
  ButtonStyle,
  ButtonInteraction,
  MessageFlags,
} from 'discord.js';
import { Component } from '@/types';

export default {
  id: /^todo:(done|del):(\d+)$/,
  data: new ButtonBuilder().setStyle(ButtonStyle.Secondary),

  async run(i: ButtonInteraction) {
    const [, action, taskId] = i.customId.match(/^todo:(done|del):(\d+)$/)!;
    // …handle action…
    await i.reply({ content: `Task #${taskId} ${action}`, flags: MessageFlags.Ephemeral });
  },
} as Component<ButtonInteraction, ButtonBuilder>;
```

Generate concrete buttons:

```ts
const prototype = (await componentsPromise).regexArr
  .find(c => (c.id as RegExp).source.startsWith('^todo:'))!
  .data as ButtonBuilder;

const btnDone = ButtonBuilder.from(prototype)
  .setCustomId(`todo:done:${id}`)
  .setLabel('✓ Done');

const btnDel  = ButtonBuilder.from(prototype)
  .setCustomId(`todo:del:${id}`)
  .setLabel('🗑️ Delete');
```

---

## 4 · Select‑menu example

```ts
// src/components/selectmenus/role-picker/index.ts
import {
  RoleSelectMenuBuilder,
  RoleSelectMenuInteraction,
  MessageFlags,
} from 'discord.js';
import { Component } from '@/types';

export default {
  id: 'role-picker',
  data: new RoleSelectMenuBuilder()
    .setCustomId('role-picker')
    .setMinValues(1)
    .setMaxValues(1),

  async run(i: RoleSelectMenuInteraction) {
    await i.member?.roles.add(i.values[0]);
    await i.reply({ content: 'Role added ✅', flags: MessageFlags.Ephemeral });
  },
} as Component<RoleSelectMenuInteraction, RoleSelectMenuBuilder>;
```

---

## 5 · Runtime cheat sheet

| Need                     | Code snippet |
|--------------------------|--------------|
| Builder by exact ID      | `exactMap.get('hello')!.data` |
| Prototype from RegExp    | `regexArr.find(c => /^todo/.test(c.id as string))!.data` |
| Show a modal             | `interaction.showModal(modalBuilder)` |
| Clone a builder          | `ButtonBuilder.from(proto).setCustomId('new')` |

---

### Best practices

* Always define **`id`**.  
* Use **RegExp IDs** for parametrised `customId` patterns.  
* Store generic builders; clone/adjust via `Builder.from()`.  
* Prefer `MessageFlags.Ephemeral` for private replies.
