export const createTree = (
  tree: Tree,
  branch: [string, string, string, string] = [ '├─', '└─', '│ ', '  ']
): string => createTreeWrapper(
    tree,
    branch
  ).join('\n');

const createTreeWrapper = (
  tree: Tree,
  branch: [string, string, string, string]
): string[] => {
  const calculatedTree = calcTree(tree);
  const { children } = calculatedTree;
  const result: string[] = [tree.text];
  const childBlock: string[] = [];

  const branches: string[] = []

  for (const index in children) {
    const t = createTreeWrapper(children[index], branch);
    branches.push(
      children.length === Number(index) + 1
      ? branch[1] // └─
      : branch[0] // ├─
    );
    branches.push(
      ...(children.length !== Number(index) + 1
      ? new Array(t.length - 1).fill(branch[2])  // '│ '
      : new Array(t.length - 1).fill(branch[3])) // '  '
    );
    childBlock.push(...t);
  }

  result.push(
    ...mergeStringArray(
      branches,
      childBlock
    )
  );

  return result;
};

const calcTree = (tree: Tree): CalculatedTree => {
  let count = 1;
  const children: CalculatedTree[] = [];
  for (const index in tree.children) {
    const t = tree.children[index];
    if (typeof t === 'string') {
      count += 1;
      children.push({
        text: t,
        count: 1,
        children: []
      });
    } else {
      const calculatedTree = calcTree(t);
      count += calculatedTree.count;
      children.push(calculatedTree);
    }
  }

  return {
    text: tree.text,
    count,
    children
  };
}

const mergeStringArray = (a: string[], b: string[]): string[] => a.map((_, i) => a[i] + (b[i] || ''));

export type Tree = {
  text: string,
  children: (Tree | string)[]
};

export type CalculatedTree = {
  text: string,
  count: number,
  children: CalculatedTree[]
};
