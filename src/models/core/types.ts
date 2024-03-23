/**
 * Type which eagerly collects all paths through a fieldType that matches a give type
 * @typeParam T - object which are indexed by the paths
 * @example
 * ```typescript
 * CrePath<{foo: {bar: number}}>
 *   =  'foo' | 'foo.bar'
 * ```
 */
export type CrePath<T, Prefix extends string | number = ''> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? Prefix extends ''
          ? CrePath<T[K], `${K}`> | `${K}`
          :
              | CrePath<T[K], `${Prefix}.${Extract<K, string | number>}`>
              | `${Prefix}.${K}`
        : never;
    }[keyof T]
  : Prefix;
