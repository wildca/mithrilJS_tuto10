import m from 'mithril';

export default {
    controller: () => {},
    view: () => {
        return [
            m('div', {class: 'container'}, [
                m('.page-header', [
                    m('h1', 'Alerts Samples')
                ])
                ,
                m('.alert.alert-success[role="alert"]', [
                    m('strong', 'Well done!'),
                    'You successfully read this important alert message.\n'
                ]),
                m('.alert.alert-info[role="alert"]', [
                    m('strong', 'Heads up!'),
                    'info.\n'
                ]),
                m('.alert.alert-warning[role="alert"]', [
                    m('strong', 'Warning!'),
                    'warning.\n'
                ]),
                m('.alert.alert-danger[role="alert"]', [
                    m('strong', 'Oh snap!'),
                    'danger.\n'
                ])
            ])
        ];
    }
};

/*
m.route(document.getElementById('root'),
            bootstrapComponent);
*/
