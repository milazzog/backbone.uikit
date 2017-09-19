
// Global lib
// import BackboneTouch from "backbone.touch";
// import DetectSwipe from "jquery-detect-swipe";

// Utils
import requestNextAnimationFrame from './lib/utils/requestAnimationFrame';
import * as style from './lib/utils/style';
import animate from './lib/utils/animate';
import State from './lib/utils/State';
import BezierEasing from './lib/utils/BezierEasing';
import search from './lib/utils/search';

// View Base
import BaseView from './lib/BaseView';
import ImageView from './lib/ImageView';
import PageView from './lib/PageView';
import RateView from './lib/RateView';

// List View
import ListView from './lib/listviews/ListView';
import ListItemView from './lib/listviews/ListItemView';

// Navigations view
import NavigationView from './lib/navigations/NavigationView';
import BarView from './lib/navigations/BarView';
import TitleBarView from './lib/navigations/TitleBarView';
import TabBarView from './lib/navigations/TabBarView';
import OsBarView from './lib/navigations/OsBarView';
const IosBarView = OsBarView;
import ScrollBarView from './lib/navigations/ScrollBarView';


// Dialogs view
import ModalView from './lib/dialogs/ModalView';
import ImagesModalView from './lib/dialogs/ImagesModalView';
import NavigationModalView from './lib/dialogs/NavigationModalView';

// Forms View
import FormView from './lib/forms/FormView';
import TextField from './lib/forms/TextField';
import PasswordField from './lib/forms/PasswordField';
import SearchFilterView from './lib/forms/SearchFilterView';
import SwitchView from './lib/forms/SwitchView';
import SelectField from './lib/forms/SelectField';
import CheckboxField from './lib/forms/CheckboxField';
import CreditCardField from './lib/forms/CreditCardField';
import LookupField from './lib/forms/LookupField';
import LookupPage from './lib/forms/LookupPage';

let index = {
	requestNextAnimationFrame : requestNextAnimationFrame,
	style                     : style,
	BezierEasing              : BezierEasing,
	search                    : search,
	animate                   : animate,
	State                     : State,
	BaseView                  : BaseView,
	ImageView                 : ImageView,
	PageView                  : PageView,
	RateView                  : RateView,
	ListView                  : ListView,
	ListItemView              : ListItemView,
	NavigationView            : NavigationView,
	BarView                   : BarView,
	TitleBarView              : TitleBarView,
	TabBarView                : TabBarView,
	OsBarView                 : OsBarView,
	IosBarView                : IosBarView,
	ScrollBarView             : ScrollBarView,
	ModalView                 : ModalView,
	ImagesModalView           : ImagesModalView,
	NavigationModalView       : NavigationModalView,
	FormView                  : FormView,
	TextField                 : TextField,
	PasswordField             : PasswordField,
	SearchFilterView          : SearchFilterView,
	SwitchView                : SwitchView,
	SelectField               : SelectField,
	CreditCardField           : CreditCardField,
	CheckboxField             : CheckboxField,
	LookupField               : LookupField,
	LookupPage                : LookupPage
};


export default index;
export {
	requestAnimationFrame     as requestAnimationFrame,
	requestNextAnimationFrame as requestNextAnimationFrame,
	style                     as style,
	BezierEasing              as BezierEasing,
	search                    as search,
	animate                   as animate,
	State                     as State,
	BaseView                  as BaseView,
	ImageView                 as ImageView,
	PageView                  as PageView,
	RateView                  as RateView,
	ListView                  as ListView,
	ListItemView              as ListItemView,
	NavigationView            as NavigationView,
	BarView                   as BarView,
	TitleBarView              as TitleBarView,
	TabBarView                as TabBarView,
	OsBarView                 as OsBarView,
	IosBarView                as IosBarView,
	ScrollBarView             as ScrollBarView,
	ModalView                 as ModalView,
	NavigationModalView       as NavigationModalView,
	ImagesModalView           as ImagesModalView,
	FormView                  as FormView,
	TextField                 as TextField,
	PasswordField             as PasswordField,
	SearchFilterView          as SearchFilterView,
	SwitchView                as SwitchView,
	SelectField               as SelectField,
	CreditCardField           as CreditCardField,
	CheckboxField             as CheckboxField,
	LookupField               as LookupField,
	LookupPage                as LookupPage
};
