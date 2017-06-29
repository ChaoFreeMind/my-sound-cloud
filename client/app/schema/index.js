/* This is for normalizr */
import { Schema, arrayOf } from 'normalizr';

export const userSchema = new Schema('users');
export const commentSchema = new Schema('comments');
export const trackSchema = new Schema('tracks');
export const playlistSchema = new Schema('playlists');

// Removing it because the user information sent back along with tracks is not intact.
trackSchema.define({
  user: userSchema,
});

// Same reason as above
commentSchema.define({
  user: userSchema,
});

export const trackArraySchema = arrayOf(trackSchema);
export const userArraySchema = arrayOf(userSchema);
export const commentArraySchema = arrayOf(commentSchema);

playlistSchema.define({
  user: userSchema,
  tracks: trackArraySchema,
});

export const playlistArraySchema = arrayOf(playlistSchema);
