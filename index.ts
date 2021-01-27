type NewLine = "\n";
type TestYaml = `
  foo: bar
  baz: bat
`;

type Trim<S extends string> =
  S extends ` ${infer S}` | `\n${infer S}`
    ? Trim<S>
    : S

type ParseYaml<Yaml extends string> =
  Trim<Yaml> extends `${infer K}: ${infer V}${NewLine}${infer Rest}`
    ? Record<K, V> & ParseYaml<Rest>
    : {};

type Yaml =  ParseYaml<TestYaml>;

const rec: Yaml = {
  foo: 'bar',
  baz: 'bat'
}
