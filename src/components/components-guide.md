# Components Guide (Button · Select Menu · Modal)

> **TL;DR**  
> 1. Files live in **`src/components/<group>/`** (`buttons`, `selects`, `modals`).  
> 2. Export object with **`id`**, optional **`data`**, mandatory **`run()`**.  
> 3. Fixed `id` ⇒ `exactMap`, RegExp `id` ⇒ `regexArr`.  
> 4. Grab builders at runtime through **`componentsPromise`**.

```
src
└─ components
   ├─ buttons
   │  ├─ hello.ts         ← string id
   │  └─ todo.ts          ← RegExp id
   ├─ selects
   │  └─ rolePicker.ts
   └─ modals
      └─ feedback.ts
```

---

## 1 · Interface Recap

```ts
import { Component } from '@/types';

export default {
  id: 'string' | /regex/,
  data?: ButtonBuilder | …                           // optional
  run: (interaction) => Promise<unknown>,            // required
  devOnly?: boolean,
  test?:    boolean,
} as Component<ExactInteractionType, ExactBuilderType>;
```

---

## 2 · Fixed ID Scenarios

### 2.1 Single Button (`hello`)

```ts
// src/components/buttons/hello.ts
import { ButtonBuilder, ButtonStyle, ButtonInteraction, MessageFlags } from 'discord.js';
import { Component } from '@/types';

export default {
  id: 'hello',
  data: new ButtonBuilder()
    .setCustomId('hello')
    .setLabel('Say Hi')
    .setStyle(ButtonStyle.Primary),

  async run(i: ButtonInteraction) {
    await i.reply({ content: '👋 Hi there!', flags: MessageFlags.Ephemeral });
  },
} as Component<ButtonInteraction, ButtonBuilder>;
```

Usage:

```ts
const comps    = await componentsPromise;
const helloBtn = comps.exactMap.get('hello')!.data as ButtonBuilder;

await channel.send({
  content: 'Press the button ↓',
  components: [new ActionRowBuilder<ButtonBuilder>().addComponents(helloBtn)],
});
```

---

### 2.2 Global Modal (`feedback`)

```ts
// src/components/modals/feedback.ts
import {
  ModalBuilder, TextInputBuilder, TextInputStyle,
  ActionRowBuilder, ModalSubmitInteraction, MessageFlags,
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
    const text = i.fields.getTextInputValue('fb');
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

## 3 · RegExp ID Scenarios

### 3.1 Task Buttons (`button:todo:<action>:<id>`)

```ts
// src/components/buttons/todo.ts
import { ButtonBuilder, ButtonStyle, ButtonInteraction, MessageFlags } from 'discord.js';
import { Component } from '@/types';

export default {
  id: /^button:todo:(done|del):(\d+)$/,
  data: new ButtonBuilder().setStyle(ButtonStyle.Secondary),

  async run(i: ButtonInteraction) {
    const [, action, tid] = i.customId.match(/^button:todo:(done|del):(\d+)$/)!;

    if (action === 'done') {
      await markDone(+tid);
      await i.reply({ content: `✔️ Task #${tid} done`, flags: MessageFlags.Ephemeral });
    } else {
      await deleteTask(+tid);
      await i.reply({ content: `🗑️ Task #${tid} deleted`, flags: MessageFlags.Ephemeral });
    }
  },
} as Component<ButtonInteraction, ButtonBuilder>;
```

Create concrete buttons:

```ts
const { regexArr } = await componentsPromise;
const proto = regexArr.find(c => (c.id as RegExp).source.startsWith('^button:todo'))!.data as ButtonBuilder;

const btnDone = ButtonBuilder.from(proto)
  .setCustomId(`button:todo:done:${taskId}`)
  .setLabel('✓ Done');

const btnDel  = ButtonBuilder.from(proto)
  .setCustomId(`button:todo:del:${taskId}`)
  .setLabel('🗑️ Delete');
```

---

## 4 · Select-Menu Variant

```ts
// src/components/selects/rolePicker.ts
import {
  RoleSelectMenuBuilder,
  RoleSelectMenuInteraction,
  MessageFlags,
} from 'discord.js';
import { Component } from '@/types';

export default {
  id: 'role:picker',
  data: new RoleSelectMenuBuilder()
    .setCustomId('role:picker')
    .setPlaceholder('Choose role')
    .setMinValues(1)
    .setMaxValues(1),

  async run(i: RoleSelectMenuInteraction) {
    const roleId = i.values[0];
    await i.member?.roles.add(roleId);
    await i.reply({ content: 'Role added ✅', flags: MessageFlags.Ephemeral });
  },
} as Component<RoleSelectMenuInteraction, RoleSelectMenuBuilder>;
```

---

## 5 · Runtime Cheat‑Sheet

| Need | Code |
|------|------|
| Builder by exact ID | `const btn = (await componentsPromise).exactMap.get('hello')!.data` |
| Builder by RegExp proto | `const proto = regexArr.find(c => /todo/.test((c.id as RegExp).source))!.data` |
| Clone builder | `ButtonBuilder.from(proto).setCustomId('new')` |
| Show Modal | `interaction.showModal(modalBuilder)` |

---

## 6 · Best Practices

* **Always set `id`** unless you intentionally cast; explicit is better than implicit.  
* Keep builders generic; customise `customId`, `label`, etc. with `Builder.from()`.  
* RegExp IDs for parameterised customIds (`button:person:<uid>`).  
* `MessageFlags.Ephemeral` instead of `ephemeral: true`.  
* Ephemeral messages vanish after restart — their buttons too.

---

*Send this doc back to ChatGPT anytime — I’ll follow it.*