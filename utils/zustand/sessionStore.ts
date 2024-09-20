import {create} from 'zustand';
import { produce } from 'immer';

export type Item = { 
    title: string;
    description: string;
    price: number;
    img: string;
    person:string;
    timestamp: string;
}
export type User = {
    email: string;
    username: string;
    public_address:string;
    owned_items?:Item[];
    created_items?:Item[];
    joinedOn: string;
}
export type ItemOnBid = Item & {
    highest_bid: number;
    time_decay:number;
}

interface SessionState {
    user: User | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
    setCreatedItems: (items: Item[]) => void;
    setOwnedItems: (items: Item[]) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isAuthenticated: false,

  // Set user and authentication state
  setUser: (user: User | null) =>
    set(
      produce((state: SessionState) => {
        state.user = user;
        state.isAuthenticated = true;
      })
    ),

  // Log user out
  logout: () =>
    set(
      produce((state: SessionState) => {
        state.user = null;
        state.isAuthenticated = false;
      })
    ),

  setCreatedItems: (items: Item[]) =>
    set(
      produce((state: SessionState) => {
        if (state.user) {
          state.user.created_items = items;
        }
      })
    ),

  setOwnedItems: (items: Item[]) =>
    set(
      produce((state: SessionState) => {
        if (state.user) {
          state.user.owned_items = items;
        }
      })
    )
}));
