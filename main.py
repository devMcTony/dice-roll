import random


def sumulate_dice_roll():
    indexes = {i: [] for i in range(1, 7)}

    # Do randomness simulation
    for _ in range(1000):
        # Gen rand number between 0.1 and 1
        num = round(random.uniform(0.1, 1), 1)
        category = min(int(num * 6) + 1, 6)
        indexes[category].append(num)

    # Compute freq and perc
    total = sum(len(v) for v in indexes.values())
    data = [(i, len(v), f"{(len(v) / 1000) * 100:.1f}%") for i, v in indexes.items()]

    # Show results
    print(f"{'FACE':^10} | {'FREQUENCY':^10} | {'PERCENTAGE':^12}")
    print("-" * 36)
    for face, freq, perc in data:
        print(f"{face:^10} | {freq:^10} | {perc:^12}")
    print("-" * 36)
    print(f"{'Total':^10} | {total:^10} | {'100.0%':^12}")


sumulate_dice_roll()
