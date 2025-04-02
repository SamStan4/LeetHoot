def two_sum(nums, target):
    m = {}
    arr = []
    for i, n in enumerate(nums):
        if n in m:
            return [i, m[n]]
        m[target - n] = i
    return []

    # n = len(nums)
    # for i in range(n - 1):
    #     for j in range(i + 1, n):
    #         if nums[i] + nums[j] == target:
    #             print([i, j])
    #             return [i, j]
    # return []  # No solution found
