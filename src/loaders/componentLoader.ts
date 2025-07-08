import fg from 'fast-glob';
import path from 'node:path';
import { Component } from '@/types';
import { COMPONENT_GLOB as GLOB } from '@/config';

export async function loadComponents() {
  const files = await fg(GLOB, { absolute: true });

  const exactMap = new Map<string, Component>();
  const regexArr: Component[] = [];

  for (const f of files) {
    const comp = (await import(path.toNamespacedPath(f))).default as Component;
    if (!comp?.run) continue;

    let id = comp.id;

    if (
      !id &&
      comp.data &&
      typeof (comp.data as any).data?.custom_id === 'string'
    ) {
      id = (comp.data as any).data.custom_id;
    }

    if (!id) continue;

    typeof id === 'string' ? exactMap.set(id, comp) : regexArr.push(comp);
  }

  return { exactMap, regexArr };
}
