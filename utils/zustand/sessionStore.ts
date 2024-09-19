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
    owned_items:Item[];
    created_items:Item[];
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
}

export const useSessionStore = create<SessionState>((set) => ({
  user: null,
  isAuthenticated: false,

  // Set user and authentication state
  setUser: (user: User | null) =>
    set(
      produce((state: SessionState) => {
        state.user = user;
        state.isAuthenticated = user !== null;
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
}));
