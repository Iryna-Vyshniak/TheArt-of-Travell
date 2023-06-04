export const selectEmail = (state) => state.auth.userData.email;
export const selectName = (state) => state.auth.userData.name;
export const selectAvatar = (state) => state.auth.userData.avatar;
export const selectUid = (state) => state.auth.userData.uid;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsUserFetching = (state) => state.auth.isUserFetching;
