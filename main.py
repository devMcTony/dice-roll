import random


def simulate_dice_roll():
    # Create dictionary to store indexes
    # e.g {1: [], 2: [], 3: [], 4: [], 5: [], 6: []}
    indexes = {i: [] for i in range(1, 7)}

    print(indexes)

    # Do randomness simulation
    for _ in range(1000):
        # Generate random number between 0 and 1 (exclusive of 1)
        num = random.random()
        category = min(int(num * 6) + 1, 6)
        indexes[category].append(num)

    # Compute frequency and percentage
    total = sum(len(v) for v in indexes.values())
    data = [(i, len(v), f"{(len(v) / 1000) * 100:.1f}%") for i, v in indexes.items()]

    # Show results
    print(f"{'FACE':^10} | {'FREQUENCY':^10} | {'PERCENTAGE':^12}")
    print("-" * 36)
    for face, freq, perc in data:
        print(f"{face:^10} | {freq:^10} | {perc:^12}")
    print("-" * 36)
    print(f"{'Total':^10} | {total:^10} | {'100.0%':^12}")


simulate_dice_roll()
