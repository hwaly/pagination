class Pagination {
    /*
     * 초기 실행
     * @param {String | DOM} container
     * @param {Object} options
     */
    constructor(container, options) {
        const _defaultOptions = {
            size: 10,
            total: 1,
            current: 1,

            href: '',
            query: '',

            firstText: '처음',
            lastText: '마지막',
            prevText: '이전',
            nextText: '다음',

            paginationClass: 'pagination',
            itemClass: 'pagination__item',
            controlClass: 'pagination__control',
            anchorClass: 'pagination__link',
            currentClass: 'pagination__item--current',
            disabledClass: 'pagination__item--disabled',
            textClass: 'pagination__page',
            firstClass: 'pagination__item--first',
            lastClass: 'pagination__item--last',
            prevClass: 'pagination__item--prev',
            nextClass: 'pagination__item--next',

            onClick: ''
        };

        Object.assign(this.options = {}, _defaultOptions, options);

        this.setContainer(container);
    }

    setContainer(container) {
        if (container) {
            this.container = container;
        }
    }

    isValid(type, value, message) {
        switch (type) {
            case 'init':
                if (value) return true;

            case 'number':
                if (typeof value === 'number') return true;

            default:
                console.log(message);
                return false;
        }
    }

    getPage() {
        const {size, total, current} = this.options;

        if (this.isValid('number', current, '숫자 아니다')) {
            const start = ~~((current - 1) / size) * size + 1;
            const end = Math.min((start + size), (total + 1));

            const first = current !== 1 ? 1 : 'disabled';
            const last = current !== total ? total : 'disabled';

            const prev = start - size > 0 ? start - size : 'disabled';
            const next = start + size < (total + 1) ? start + size : 'disabled';

            Object.assign(this.options, {start, end, prev, next, first, last});
        }
    }

    setOptions(options) {
        if (typeof options === 'object') {
            Object.assign(this.options, options);
        }

        return this;
    }

    makeControl(type) {
        const text = this.makeText(type);
        const anchor = this.makeLink(this.options[type], this.options[type], text);

        return this.makeItem(anchor, 'control', type, this.options[type]);
    }

    makeItems() {
        const current = this.options.current;
        let result = '';

        for (let i = this.options.start; i < this.options.end; i++) {
            const isCurrent = i !== current ? '' : 'current';
            const text = this.makeText(i);
            const anchor = this.makeLink(i, isCurrent, text);

            result += this.makeItem(anchor, isCurrent);
        }

        return result;
    }

    makeItem(text, ...typeStatus) {
        const classList =
            [this.options.itemClass]
                .concat(typeStatus.map(key => this.options[key + 'Class']))
                .filter(value => !!value)
                .join(' ');

        return `<li class="${classList}">${text}</li>`;
    }

    makeLink(page, status, text) {
        switch (status) {
            case 'current':
                return `<strong class="${this.options.anchorClass}">${text}</strong>`;
            case 'disabled':
                return `<span class="${this.options.anchorClass}">${text}</span>`;
            default:
                const query = this.options.query ? `?${this.options.query}${page}` : '';
                const href = this.options.href ? `${this.options.href}${query}` : '#';

                return `<a href="${href}" class="${this.options.anchorClass}" data-page="${page}">${text}</a>`;
        }
    }

    makeText(page) {
        return `<span class="${this.options.textClass}">
            ${typeof page === 'number' ? page : this.options[page + 'Text']}
        </span>`;
    }

    render() {
        if (this.isValid('init', container, 'container 는 필수입니다.')) {
            return;
        }

        this.getPage();

        const tag = [
            `<ul class="${this.options.paginationClass}">`,
            this.makeControl('first'),
            this.makeControl('prev'),
            this.makeItems(),
            this.makeControl('next'),
            this.makeControl('last'),
            '</ul>'
        ].join('');

        this.container.innerHTML = tag;

        if (this.options.onClick) {
            [...this.container.querySelectorAll('a')].forEach((a) => {
                a.addEventListener('click', this.options.onClick.bind(a), false);
            });
        }
    }
}

export default Pagination;