# ascii_tree
ascii tree for Deno module

## Example
Code
```TypeScript
const tree = createTree({
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

```
Result 
```Plain
root
├─usr
│ ├─bin
│ └─lib
└─etc
  ├─root
  └─mail
```
