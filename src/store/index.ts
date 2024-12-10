import { create } from 'zustand'

type State = {
  editing: boolean
}

type Action = {
  setEditing: (_editing: boolean) => void
}

const useStore = create<State & Action>((set) => ({
  editing: false,
  setEditing: (editing) => set({ editing })
}))

export default useStore
