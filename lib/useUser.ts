// export async function useUser() {
//   const accessToken = cookies().get(COOKIE_NAMES.SHOPIFY.ACCESS_TOKEN)?.value;

//   const isLoggedIn = accessToken ? true : false;

//   if (isLoggedIn) {
//     const expiredCoockie = await getExpiryTime();
//     if (!expiredCoockie) {
//       return { isLoggedIn: false };
//     }
//   }

//   return { isLoggedIn };
// }

export async function useUser() {
  const isLoggedIn = false;

  return { isLoggedIn };
}
