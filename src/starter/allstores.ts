/* Gestion des stores:
CUSTOM : inscrire tous les stores statiques de l'application.
- par store:
  import { useCounterStore } from '../demo/counter'
  Dans la class Stores:
    private static _counter: any
    static get counter() { if (!this._counter)

Le tout premier appel à un store statique DOIT s'effectuer depuis un <script setup>:
- il utilise un useXXXStore pour la création, qui ne fonctionne QUE dans ce contexte.
Une fois un store créé, il est accessible depuis n'importe quel script (pas forcément <setup>.

CUSTOM: ajout d'une CLASSE de store dynamique. Voir dans le code ci-aprés.

La création d'une instance d'un store dynamique DOIT s'effectuer
dans un <script setup>.
Les instances créées sont accessibles depuis tout type de script (même pas setup).
*/

import { useStarterStore } from '@/starter/store'
import { useSafeStore } from '../stores/safe-store'
import { useSessionStore } from '../stores/session-store'
import { useUiStore } from '../stores/ui-store'
import { useFormStore } from '../stores/form-store'

import { useDocStore } from '../stores/docs'

// import { useCounterStore } from '../demo/counter'

export default class Stores {
  // Stores statiques à customiser pour chaque application

  private static _starter: any
  static get starter() { if (!this._starter) this._starter = useStarterStore(); return this._starter}

  private static _safe: any
  static get safe() { if (!this._safe) this._safe = useSafeStore(); return this._safe}

  private static _session: any
  static get session() { if (!this._session) this._session = useSessionStore(); return this._session}

  private static _ui: any
  static get ui() { if (!this._ui) this._ui = useUiStore(); return this._ui}

  private static _form: any
  static get form() { if (!this._form) this._form = useFormStore(); return this._form}

  /* CUSTOM : séquence à reprendre pour chaque CLASSE de store dynamique
  (pas pour chaque instance) */ 

  static dynamicDocStores = new Map<string, any>()

  static getDocStore (svc: string, org: string, noforce?: boolean) : any  {
    const k = svc + '/' + org
    let st = this.dynamicDocStores.get(k)
    if (!st) {
      if (noforce) return undefined
      const useStore = useDocStore(k)
      // @ts-expect-error
      st = useStore()
      this.dynamicDocStores.set(k, st)
    }
    return st
  }

  static resetDocStores () {
    for(const [,st] of this.dynamicDocStores) st.reset()
    this.dynamicDocStores.clear()
  }
}
