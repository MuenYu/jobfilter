async function delay(min: number, max: number): Promise<void>  {
  const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, randomDelay));
}

export async function fastDelay(): Promise<void> {
  return delay(100, 200);
}

export async function slowDelay(count:number = 1): Promise<void> {
  return delay(count * 1500, count * 2000);
}