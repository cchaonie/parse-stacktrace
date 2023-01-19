import { SourceMapConsumer, RawSourceMap } from 'source-map';

export default async (rawSourceMap: RawSourceMap, stackTrace: string) => {
  try {
    const smc = await new SourceMapConsumer(rawSourceMap);

    const stackLines = stackTrace.split('\\n');

    const sourceReg = /\(.*:(\d+):(\d+)\)/;

    return stackLines.map(eachStack => {
      const result = sourceReg.exec(eachStack);
      if (result) {
        const [_, line, column] = result;

        const pos = smc.originalPositionFor({
          line: parseInt(line, 10),
          column: parseInt(column, 10),
        });

        if (pos.source && pos.line && pos.column) {
          const replacedLine = eachStack.replace(
            sourceReg,
            `at ${pos.name || ''} (${pos.source}:${pos.line}:${pos.column})`
          );
          return replacedLine;
        }
      }
      return eachStack;
    });
  } catch (e) {
    console.error(e);
    return stackTrace;
  }
};
