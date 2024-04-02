import { Result, success, error } from './result';

enum Option {
    None = 0,
    Require = 1,
}

export interface Options {
    filePath: string;
    require: string[];
}

export const getAndParseArguments = (): Result<Options> => {
    const options: Options = {
        filePath: '',
        require: [],
    };

    if (process.argv.length < 3) {
        return error('Missig required argument: filePath');
    }

    options.filePath = process.argv[2];

    if (process.argv.length > 3) {
        let currentOption = Option.None;
        for (let i = 3; i < process.argv.length; i++) {
            const currentArgument = process.argv[i];
            if (currentArgument.startsWith('-')) {
                switch (currentArgument) {
                    case '-r':
                    case '--require':
                        currentOption = Option.Require;
                        break;
                    default:
                        return error(`Unknown option: ${currentArgument}`);
                }
            } else {
                switch (currentOption) {
                    case Option.Require:
                        options.require.push(currentArgument);
                        break;
                    default:
                        return error(`Unexpected additional argument: ${currentArgument}`);
                }
            }
        }
    }

    return success(options);
};
