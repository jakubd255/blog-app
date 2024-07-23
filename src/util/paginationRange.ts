import lodash from "lodash";



const getPaginationRange = (totalPage: number, page: number, limit: number, siblings: number) => {

    const totalPageNoInArray = 7+siblings;
    if(totalPageNoInArray >= totalPage) {
        return lodash.range(1, totalPage+1);
    }

    const leftSiblinsIndex = Math.max(page-siblings, 1);
    const rightSiblingsIndex = Math.min(page+siblings);

    const showLeftDots = leftSiblinsIndex > 2;
    const showRightDots = rightSiblingsIndex < totalPage-2;

    if(!showLeftDots && showRightDots) {
        const leftItemsCount = 3 + 2*siblings;
        const leftRange = lodash.range(1, leftItemsCount+1);
        return [...leftRange, "N", totalPage];
    }
    else if(showLeftDots && !showRightDots) {
        const rightItemsCount = 3 + 2*siblings;
        const rightRange = lodash.range(totalPage-rightItemsCount+1, totalPage+1);
        return [1, "P", ...rightRange];
    }
    else {
        const middleRange = lodash.range(leftSiblinsIndex, rightSiblingsIndex+1);
        return [1, "P", ...middleRange, "N", totalPage]
    }
}

export default getPaginationRange;