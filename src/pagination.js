
export class Pagination{
    constructor(page, count, total) {
        this.page = page;
        this.count = count;
        this.total = total
    }
    setPagination(page, count, total) {
        this.page = page
        this.total = total
        this.count = count
        return this
    }
}
