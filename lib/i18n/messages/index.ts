// Aggregates every namespace. Arabic files are typed against their English
// counterparts, so a missing or misspelled key is a type error.
import en_common from './en/common';
import ar_common from './ar/common';
import en_home from './en/home';
import ar_home from './ar/home';
import en_about from './en/about';
import ar_about from './ar/about';
import en_projects from './en/projects';
import ar_projects from './ar/projects';
import en_project from './en/project';
import ar_project from './ar/project';
import en_solutions from './en/solutions';
import ar_solutions from './ar/solutions';
import en_solution from './en/solution';
import ar_solution from './ar/solution';
import en_service from './en/service';
import ar_service from './ar/service';
import en_privacy from './en/privacy';
import ar_privacy from './ar/privacy';
import en_products from './en/products';
import ar_products from './ar/products';
import en_footer from './en/footer';
import ar_footer from './ar/footer';
import en_contact from './en/contact';
import ar_contact from './ar/contact';
import en_widgets from './en/widgets';
import ar_widgets from './ar/widgets';

const en = {
    common: en_common,
    home: en_home,
    about: en_about,
    projects: en_projects,
    project: en_project,
    solutions: en_solutions,
    solution: en_solution,
    service: en_service,
    privacy: en_privacy,
    products: en_products,
    footer: en_footer,
    contact: en_contact,
    widgets: en_widgets,
};

export type Messages = typeof en;

const ar: Messages = {
    common: ar_common,
    home: ar_home,
    about: ar_about,
    projects: ar_projects,
    project: ar_project,
    solutions: ar_solutions,
    solution: ar_solution,
    service: ar_service,
    privacy: ar_privacy,
    products: ar_products,
    footer: ar_footer,
    contact: ar_contact,
    widgets: ar_widgets,
};

export const messages = { en, ar };
