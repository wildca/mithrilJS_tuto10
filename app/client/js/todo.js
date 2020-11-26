import m from 'mithril';
import 'polythene-theme/theme/theme';
//import btn from 'polythene/button/button';

//(1)モデルのインスタンスを格納するプロパティの作成
//(2)入力フォームのバインディングするプロパティの作成
//(3)追加ボタンが押された時のメソッド定義の3つです。
// モデルとビューの仲介をする
//編集中のダイアログの状態など、揮発しても問題がないデータの管理をします。
//仲介をするということで、モデルのインスタンス（たいてい複数ある）を所有するのはビューモデルになります。

class Todo {
    constructor(data) {
        this.description = m.prop(data.description);
        this.done = m.prop(false);
    }
    static list() {
        return m.request({method: 'GET',
                          url: '/tasks',
                          type: Todo});
    }
    static save(todoList) {
        let data = todoList.filter((todo) => !todo.done());
        m.request({method: 'POST',
                   url: '/tasks',
                   data: data});
    }
}

const vm = {
    init: () => {
        vm.list = Todo.list();
        vm.description = m.prop('');
        vm.add = () => {
            if(vm.description()) {
                vm.list().push(new Todo({description: vm.description()}));
                vm.description('');
                Todo.save(vm.list());
            }
        };
        vm.check = (value) => {
            this.done(value);
            Todo.save(vm.list());
        };
    }
};

function controller() {
    vm.init();
}

function view() {
    return m('div', [
             m('input', {
                 onchange: m.withAttr('value', vm.description),
                 value: vm.description()
             }),
             m('button', {onclick: vm.add}, '追加'),
             m('table',
               vm.list().map((task) =>
                 m('tr', [
                     m('td', [
                         m('input[type=checkbox]', {
                             onclick: m.withAttr('checked', vm.check.bind(task)),
                             value: task.done()
                         })
                     ]),
                     m('td', {
                         style: { textDecoration: task.done() ? 'line-through' : 'none' }
                     }, task.description())

                 ])
               ))
           ]);
}


m.mount(document.getElementById('root'), {
    controller: controller,
    view: view
});


/*
const myBtn = m.component(btn, {
    label: 'Button',
    raised: true
});

const myApp = {
    controller: () => {},
    view: controller => {
        webconsole();
        return m('h1', 'hello world');
    }
};

m.mount(document.getElementById('root'), myBtn);
*/
