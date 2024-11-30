import { create } from "zustand";

export const useContentStore = create((set) => ({
  contentType: "movie", // Default content type
  bookmarks: [], // Store for bookmarks
  
  // Action to set content type (movies or TV shows)
  setContentType: (type) => set({ contentType: type }),

  // Action to add a new bookmark
  addBookmark: (content) => set((state) => ({
    bookmarks: [...state.bookmarks, content], // Add content to bookmarks
  })),

  // Action to remove a bookmark by its id
  removeBookmark: (id) => set((state) => ({
    bookmarks: state.bookmarks.filter((content) => content.id !== id), // Remove content by id
  })),
}));
