def product_except_self(nums):
    left = [0] * len(nums)
    right = [0] * len(nums)

    left[0] = nums[0]
    right[-1] = nums[-1]

    # scan from left
    for i in range(1, len(nums)):
        left[i] = nums[i] * left[i - 1]

    # scan from the right 
    for i in range(len(nums) - 2, -1, -1):
        right[i] = nums[i] * right[i + 1]

    ret = [0] * len(nums)
    for i in range(len(nums)):
        if i == 0:
            ret[i] = right[i + 1]
        elif i == len(nums) - 1:
            ret[i] = left[i - 1]
        else:
            ret[i] = left[i - 1] * right[i + 1]

    return ret
