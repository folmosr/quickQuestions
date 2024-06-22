describe('Test getCapitalizeFirstWord function', () => {
  it('Is name value NULL?', () => {
    expect(() => getCapitalizeFirstWord(null)).toThrow(
      new Error('Failed to capitalize first word with null'),
    );
  });
  it('Is name value a falsy value?', () => {
    expect(getCapitalizeFirstWord(false)).toBeFalsy();
  });
  it('Name value gets capitalized', () => {
    expect(getCapitalizeFirstWord('fabian')).toEqual('Fabian');
  });
});

function getCapitalizeFirstWord(name: string): string {
  if (name == null) {
    throw new Error('Failed to capitalize first word with null');
  }
  if (!name) {
    return name;
  }
  return name
    .split(' ')
    .map((n) =>
      n.length > 1
        ? n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()
        : n,
    )
    .join(' ');
}