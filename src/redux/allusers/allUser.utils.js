export const updateUserToUserList = (userList, userToUpdate) => {
  return userList.map((user) =>
    user.id === userToUpdate.id
      ? {
          ...user,
          login: userToUpdate.login,
          html_url: userToUpdate.html_url,
          avatar_url: userToUpdate.avatar_url,
        }
      : user
  );
};
