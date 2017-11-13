import getSura from './getSura';
import getPage from './getPage';
import {TYPE_PAGE, TYPE_SURA} from '../../constants';

export default function (type, index, source) {
    switch (type) {
        case TYPE_SURA:
            return getSura(source, index);
        case TYPE_PAGE:
            return getPage(source, index);
        default:
            return [];
    }
}
