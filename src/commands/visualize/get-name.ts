import { PackageName } from "./interfaces";

export const getPackageName = ({scope, name}: {scope?: string | null | undefined, name: string}): PackageName => {
    if (!scope) {
        return name as PackageName;
    }

    return `@${scope}/${name}` as PackageName;
};
