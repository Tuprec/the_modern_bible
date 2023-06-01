export class FormValidator {
    validators = [];
    errors = [];

    constructor(form) {
        this.form = form;
        this.form.addEventListener('submit', (event) => this.onSubmit(event))
    }

    addValidator(validator) {
        this.validators.push({...validator, field: this.form.elements[validator.name]})
    }

    onSubmit(event) {
        this.removeInlineErrors();

        if (!this.validate()) {
            event.preventDefault();
            event.stopImmediatePropagation();
            this.showInlineErrors();
        }
    }

    removeInlineErrors() {
        this.form.querySelectorAll('.field-error')
            .forEach(element => element.remove());
        this.errors.forEach(err => {
            if (err.field instanceof Node) {
                err.field.classList.remove('invalid');
            } else if (err.field instanceof NodeList) {
                err.field.forEach(node => {
                    node.classList.remove('invalid');
                })
            }
        })
        this.errors = [];
    }

    createInlineError(error) {
        const span = document.createElement("SPAN");

        span.className = 'field-error';
        span.innerText = error.message;
        span.id = `${error.name}-error`;

        return span
    }

    showInlineErrors() {
        this.errors.forEach(err => {
            const errorSpan = this.createInlineError(err);

            if (err.field instanceof Node) {
                err.field.classList.add('invalid');
                errorSpan.setAttribute('aria-invalid', 'true');
                err.field.labels[0].appendChild(errorSpan);
            } else if (err.field instanceof NodeList) {
                err.field.forEach(node => {
                    node.classList.add('invalid');
                    errorSpan.setAttribute('aria-describedby', 'errorSpan.id');
                    errorSpan.setAttribute('aria-invalid', 'true');
                })
                const fieldSet = err.field[0].closest('label');
                const legend = fieldSet.querySelector('legend');
                if (legend) {
                    legend.appendChild(errorSpan);
                }
            }
        })
    }

    validate() {
        for (let i = 0; i < this.validators.length; i++) {
            if (!this.validators[i].method(this.validators[i].field)) {
                if (this.errors.find(v => this.validators[i].name === v.name)) {
                    continue
                }
                this.errors.push(this.validators[i]);
            }
        }
        // //debug purpose
        // for (let j = 0; j < this.errors.length; j++) {
        //     console.log(this.errors[j]);
        // }
        return this.errors.length === 0;
    }
}