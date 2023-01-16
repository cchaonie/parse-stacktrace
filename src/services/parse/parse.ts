import { SourceMapConsumer, RawSourceMap } from 'source-map';

export default async (rawSourceMap: RawSourceMap, stackTrace: string) => {
  try {
    const smc = await new SourceMapConsumer(rawSourceMap);

    const stackLines = stackTrace.split('\n');

    const sourceReg = /\(.*(:\d+)(:\d+)\)/;

    return stackLines.map(line => {
      const result = sourceReg.exec(line);
      if (result) {
        const [_, line, column] = result;
        const pos = smc.originalPositionFor({
          line: parseInt(line, 10),
          column: parseInt(column, 10),
        });
        return line.replace(
          sourceReg,
          `at ${pos.name || ''} (${pos.source}:${pos.line}:${pos.column})`
        );
      }
    });
  } catch (e) {
    console.error(e);
    return stackTrace;
  }
};
