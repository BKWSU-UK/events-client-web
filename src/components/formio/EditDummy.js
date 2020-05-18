import baseEditForm from 'formiojs/components/_classes/component/Component.form';

const editDummy = (...extend) => {
    return baseEditForm([], ...extend);
};

export default editDummy;