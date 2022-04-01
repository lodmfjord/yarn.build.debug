export type PackageName = string & { __TYPE__: 'PackageName'; };
export type Graphs = Record<PackageName, PackageName[]>;

export const typeIsPackageName = (value: string): value is PackageName => true;
