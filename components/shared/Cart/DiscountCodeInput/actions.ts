'use server';

export async function applyDiscountCode() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    success: true
  };
}
