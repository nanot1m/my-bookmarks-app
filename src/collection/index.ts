export function* unique<T>(xs: Iterable<T>): Iterable<T> {
  const memo = new Set();
  for (const x of xs) {
    if (memo.has(x)) {
      continue;
    }
    yield x;
    memo.add(x);
  }
}

export function* map<T, R>(fn: (x: T) => R, xs: Iterable<T>): Iterable<R> {
  for (const x of xs) {
    yield fn(x);
  }
}

export function toArray<T>(xs: Iterable<T>): Array<T> {
  return Array.from(xs);
}
