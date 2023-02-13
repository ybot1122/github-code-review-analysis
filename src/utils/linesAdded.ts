export const numberOfLinesAdded = (data: any) => {

    const result = data.map((el: any) => {
        return el.additions;
    });

    return result;
}