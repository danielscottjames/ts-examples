// Turing Complete (ish) - Abusing mapped types
type StringBool = "true"|"false";


interface AnyNumber { prev?: any, isZero: StringBool };
interface PositiveNumber { prev: any, isZero: "false" };

type IsZero<TNumber extends AnyNumber> = TNumber["isZero"];
type Next<TNumber extends AnyNumber> = { prev: TNumber, isZero: "false" };
type Prev<TNumber extends PositiveNumber> = TNumber["prev"];

type _0 = { isZero: "true" };
type _1 = Next<_0>; // { prev: _0; isZero: "false"; }
type _2 = Next<_1>;
type _3 = Next<_2>;
type _4 = Next<_3>;
type _5 = Next<_4>;
type _6 = Next<_5>;
type _7 = Next<_6>;
type _8 = Next<_7>;
type _9 = Next<_8>;

// The ability to use the value of a resolved type alias as a key in mapped types,
// as well as recursion,
// is what enables turing completeness.
type Add<T1 extends AnyNumber, T2> = { "true": T2, "false": Next<Add<Prev<T1>, T2>> }[IsZero<T1>];

type _18 = Add<_9, _9>;

// (Disclaimer: recursion is capped -- therefore not actually turing complete anymore)
// see more at https://github.com/Microsoft/TypeScript/issues/14833
