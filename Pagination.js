class Pagination {
    constructor(container, options) {
        this.options = {
            total: 13,
            size: 5,
            current: 10
        };

        Object.assign(this.options, options);

        this.container = container;
    }

    render() {
        let tag = '<nav class="pagination"><ul>';
        let link = (idx) => `#${idx}`;

        const start = ~~(this.options.current / this.options.size) * this.options.size;
        const end = Math.min((this.options.current + this.options.size - 1), this.options.total) + 1;



        for (let i = start; i < end; i++) {
            if (i !== this.options.current) {
                tag += `<li><a href="${link(i)}"><span>${i}</span></a></li>`;
            } else {
                tag += `<li><strong><span>${i}</span></strong></li>`;
            }
        }

        tag += '</ul></nav>';

        this.container.innerHTML = tag;
    }
}

export default Pagination;