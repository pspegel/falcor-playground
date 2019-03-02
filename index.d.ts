declare module 'mongoose-seed' {
  interface Data {
    model: string;
    documents: any[];
  }

  export const connect: (db: string, callback?: () => void) => void;
  export const loadModels: (filePaths: string[]) => void;
  export const clearModels: (modelArray: string[], callback?: () => void) => void;
  export const populateModels: (dataArray: Data[], callback?: () => void) => void;
  export const disconnect: () => void;
  export const setLogOutput: (logOutput: boolean) => void;
}
