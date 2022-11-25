import { assertEquals } from 'https://deno.land/std@0.166.0/testing/asserts.ts';
import { createTree } from './mod.ts';

Deno.test('Basic tree', () => {
  const actual = createTree({
    text: 'root',
    children: [
      {
        text: 'usr',
        children: [
          'bin', 'lib'
        ]
      }, {
        text: 'etc',
        children: [
          'root', 'mail'
        ]
      }
    ]
  });

  console.log(actual)

  const expected = `root\n├─usr\n│ ├─bin\n│ └─lib\n└─etc\n  ├─root\n  └─mail`

  assertEquals(actual, expected);
});

Deno.test('custom branch tree', () => {
  const actual = createTree(
    {
      text: 'root',
      children: [
        {
          text: 'usr',
          children: [
            'bin', 'lib'
          ]
        }, {
          text: 'etc',
          children: [
            'root', 'mail'
          ]
        }
      ]
    },
    ['├─', '╰─', '│ ', '  '] // Custom branches
  );

  const expected = `root\n├─usr\n│ ├─bin\n│ ╰─lib\n╰─etc\n  ├─root\n  ╰─mail`

  assertEquals(actual, expected);
});

Deno.test('Big tree', () => {
  const actual = createTree(
    {
      text: 'root',
      children: [
        {
          text: 'usr',
          children: [
            {
              text: 'sbin',
              children: [
                'ab', 'ac', 'accton', 'amt'
              ]
            }, {
              text: 'bin',
              children: [
                'a2p', 'aa', 'actool', 'addftinfo'
              ]
            }, 'lib'
          ]
        }, {
          text: 'bin',
          children: [
            'bash', 'cat', 'chmod', 'cp', 'csh', 'dash',
            'date', 'dd', 'df', 'echo', 'ed', 'expr', 'hostname', 'kill',
            'ksh', 'launchctl', 'link', 'ln', 'ls', 'mdkir', 'mv',
            'pax', 'ps', 'pwd', 'rm', 'rmdir', 'sh', 'sleep', 'stty',
            'sync', 'tcsh', 'test', 'unlink', 'wait4path', 'zsh'
          ]
        },
        'tmp',
        {
          text: 'etc',
          children: [
            'root', 'mail'
          ]
        }
      ]
    }
  );

  const expected = `root\n├─usr\n│ ├─sbin\n│ │ ├─ab\n│ │ ├─ac\n│ │ ├─accton\n│ │ └─amt\n│ ├─bin\n│ │ ├─a2p\n│ │ ├─aa\n│ │ ├─actool\n│ │ └─addftinfo\n│ └─lib\n├─bin\n│ ├─bash\n│ ├─cat\n│ ├─chmod\n│ ├─cp\n│ ├─csh\n│ ├─dash\n│ ├─date\n│ ├─dd\n│ ├─df\n│ ├─echo\n│ ├─ed\n│ ├─expr\n│ ├─hostname\n│ ├─kill\n│ ├─ksh\n│ ├─launchctl\n│ ├─link\n│ ├─ln\n│ ├─ls\n│ ├─mdkir\n│ ├─mv\n│ ├─pax\n│ ├─ps\n│ ├─pwd\n│ ├─rm\n│ ├─rmdir\n│ ├─sh\n│ ├─sleep\n│ ├─stty\n│ ├─sync\n│ ├─tcsh\n│ ├─test\n│ ├─unlink\n│ ├─wait4path\n│ └─zsh\n├─tmp\n└─etc\n  ├─root\n  └─mail`

  assertEquals(actual, expected);
})
