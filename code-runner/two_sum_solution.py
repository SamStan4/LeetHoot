def two_sum(nums, target):
    m = {}
    for i, n in enumerate(nums)
        if n in m:
            return [i, m[n]]
        m[target - n] = i+1

    return []
