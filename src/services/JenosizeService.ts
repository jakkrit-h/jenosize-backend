export type PlayerType = 1 | 2 | 0;
export const xoBot = async (slots: PlayerType[]) => {
  const nullIndex: number[] = [];
  let response: number = -1;
  slots.map((s, i) => {
    if (s === 0) {
      nullIndex.push(i);
    }
  });

  const intercepIndex = checkEnemyAlmostVictory(slots);
  if (slots.every((s) => s === 0)) {
    response = Math.floor(Math.random() * 9) + 1;
  } else if (intercepIndex !== null) {
    response = intercepIndex;
  } else {
    const randIndex = Math.floor(Math.random() * nullIndex.length);
    const slotIndex = nullIndex[randIndex];
    response = slotIndex;
  }
  return response;
};
export const checkEnemyAlmostVictory = (slot: PlayerType[]): number | null => {
  const checkList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let response: number | null = null;

  for (let round = 0; round < checkList.length; round++) {
    const checker = checkList[round];
    const values = [slot[checker[0]], slot[checker[1]], slot[checker[2]]];

    if (values.filter((v) => v === 1).length == 2 && values.includes(0)) {
      response = checker[values.findIndex((v) => v === 0)];
      break;
    }
  }

  return response;
};

export function checkGame24(nums: number[]) {
  return calculate(nums);
}
function calculate(nums: number[]) {
  const target = 24;
  if (nums.length === 1) {
    return nums[0] === target;
  }

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j) {
        const num1 = nums[i];
        const num2 = nums[j];
        const remainingNums = nums.filter(
          (_, index) => index !== i && index !== j,
        );

        if (
          calculate([...remainingNums, num1 + num2]) ||
          calculate([...remainingNums, num1 - num2]) ||
          calculate([...remainingNums, num1 * num2]) ||
          (num2 !== 0 && calculate([...remainingNums, num1 / num2]))
        ) {
          return true;
        }
      }
    }
  }

  return false;
}
