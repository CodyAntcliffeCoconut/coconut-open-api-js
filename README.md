# Coconut Open API JS SDK

[![npm Version][ico-version]][link-npm]
[![Software License][ico-license]](LICENSE.md)
[![Build Status][ico-travis]][link-travis]
[![Coverage Status][ico-codecov]][link-codecov]
[![npm downloads][ico-downloads]][link-downloads]

## Install

Using npm:

```bash
$ npm install coconut-open-api-js
```

Using yarn:

```bash
$ yarn add coconut-open-api-js
```

## Official Documentation

Documentation for the Open API can be found on the [Developer Portal][link-developers].

## Usage

### Answers

##### Methods

- `for(question: number)`

Set an attribute to determine the identifier of the question being answer.

- `is(value: string)`

Set an attribute to determine the actual answer's value.

##### Example

```javascript
import { Answer } from 'coconut-open-api-js';

class Answers {
  static create({ question, value }) {
    return (new Answer())
      .for(question)
      .is(value);
  }
}
```

### Appointments

##### Methods

- `add(appointment: number)`

Add the currently supplied attendees to the given appointment.

- `at(location: number)`

Set a relationship which will tell the API to use the given location identifier when creating an appointment.

- `attendedBy(users: number | number[])`

Set a relationship which will tell the API to use the given additional user identifier when creating an appointment.

- `book()`

Create a new appointment using the pre-set parameters.

- `by(user: number)`

Set a relationship which will tell the API to use the given user identifier when creating an appointment.

- `cancel(appointment: number, attendee: number, code: string)`

Cancel an appointment for a specific attendee matching the given appointment, attendee and confirmation code identifiers.

- `campaign(campaign: string)`

Set an attribute which will tell the API to use the given string as the campaign UTM parameter when creating an appointment.

- `content(content: string)`

Set an attribute which will tell the API to use the given string as the content UTM parameter when creating an appointment.

- `for(services: number | numbers[])`

Set a relationship which will tell the API to use the given service identifier when creating an appointment.

- `get()`

Find an appointment matching the pre-set matching parameters.

- `in(timezone: string)`

Set the timezone in which the server will interpret the appointment start time as.

- `matching(matchers: AppointmentMatcherParameters)`

Set a filter to use in order to find an existing appointment.

- `method(method: number)`

Set a filter which will tell the API to use the given meeting method when creating an appointment.

- `medium(medium: string)`

Set an attribute which will tell the API to use the given string as the medium UTM parameter when creating an appointment.

- `notify(notifications: AppointmentNotificationParameters)`

Set a filter to determine who should be notified when booking an appointment.

- `recaptcha(recaptchaToken: string)`

Set an attribute which will tell the API to use the given recaptchaToken to validate the user request via reCaptcha check.

- `reschedule(appointment: number, code: string)`

Reschedule an appointment matching the given appointment identifier using the pre-set start parameter.

- `starting(start: string)`

Set an attribute which will tell the API to use the given start date time string as the start time of the new appointment.

- `source(source: string)`

Set an attribute which will tell the API to use the given string as the source UTM parameter when creating an appointment.

- `supporting(locale: string | null)`

Set a locale to use as a filter when not supplying a staff preference to ensure the best possible match when creating an appointment.

- `term(term: string)`

Set an attribute which will tell the API to use the given string as the term UTM parameter when creating an appointment.

- `through(origin: number)`

Set an attribute which will tell the API to use the given origin constant as the booked through value when creating an appointment.

- `uploads(uploadedFiles: UploadedFile[])`

Attach uploaded files when creating an appointment.

- `via(invitation: number)`

Set an attribute which will tell the API to use the given invitation identifier when creating an appointment.

- `with(attendees: AttendeeModel | AttendeeModel[])`

Set a relationship which will tell the API to use the given attendee model(s) when creating a new appointment.

- `withInviteOnly(inviteOnlyResources?: boolean)`

Set an attribute which will tell the API to allow invite only location, service and user to be used when creating an appointment.

- `withinUserCategory(userCategory: number)`

Set a relationship which will tell the API to use the given user category identifier when creating an appointment.

- `withoutMeetingLink(skipMeetingLinkGeneration?: boolean)`

Set an attribute which will tell the API to skip the meeting link generation when creating an appointment.

- `workflow(workflow: number)`

Set a relationship which will tell the API to use the given workflow identifier when creating an appointment.

##### Example

```javascript
import { OpenApi, Attendee, Answer, MeetingMethods, Notifications, Origins, Response } from 'coconut-open-api-js';

class Appointments {
  constructor() {
    this.api = new OpenApi();
  }

  async add(attributes) {
    const {
      address, appointment, campaign, city, content, country, email, file,
      firstName, key, language, lastName, medium, notes, phone, question,
      source, term, value,
    } = attributes;

    const answer = (new Answer())
      .for(question)
      .is(value);
    const attendee = (new Attendee())
      .answers(answer)
      .located({ address, city, country })
      .messagable()
      .named(firstName, lastName)
      .provided(notes)
      .reachable({ phone, email })
      .speaks(language);

    return this.api
      .appointments()
      .campaign(campaign)
      .content(content)
      .medium(medium)
      .method(MeetingMethods.AT_LOCATION)
      .source(source)
      .term(term)
      .with(attendee)
      .through(Origins.MODERN_CLIENT_VIEW)
      .uploads([{ key, file }])
      .notify(Notifications.ALL)
      .add(appointment);
  }

  async book(attributes) {
    const {
      address, campaign, city, content, country, email, file, firstName, key, 
      invitation, language, lastName, location, locale, medium, notes, phone, 
      question, service, source, start, term, timezone, user, userCategory, 
      users, value, workflow,
    } = attributes;

    const answer = (new Answer())
      .for(question)
      .is(value);
    const attendee = (new Attendee())
      .answers(answer)
      .located({ address, city, country })
      .messagable()
      .named(firstName, lastName)
      .provided(notes)
      .reachable({ phone, email })
      .speaks(language);

    return this.api
      .appointments()
      .at(location)
      .attendedBy(users)
      .by(user)
      .for(service)
      .starting(start)
      .campaign(campaign)
      .content(content)
      .medium(medium)
      .in(timezone)
      .source(source)
      .supporting(locale)
      .term(term)
      .uploads([{ key, file }])
      .via(invitation)
      .with(attendee)
      .through(Origins.MODERN_CLIENT_VIEW)
      .withInviteOnly()
      .withinUserCategory(userCategory)
      .withoutMeetingLink()
      .workflow(workflow)
      .notify(Notifications.ALL)
      .book();
  }

  async cancel(attributes) {
    const { appointment, attendee, code } = attributes;

    // We can optionally submit custom form responses when cancelling
    // appointments by utilizing the Response and Attendee models.
    const person = (new Attendee())
      .as(attendee)
      .responses([
        (new Response()).for(1).is('an answer'),
        (new Response()).for(2).selected(1),
      ]);

    return this.api.appointments()
      .with(person)
      .cancel(appointment, attendee, code);
  }

  async fetch({ code, id }) {
    return this.api.appointments().matching({ code, id }).get();
  }

  async reschedule({ appointment, code, start }) {
      return this.api
        .appointments()
        .starting(start)
        .withoutMeetingLink()
        .notify(Notifications.ALL)
        .reschedule(appointment, code);
    }
  }
```

### Attendees

##### Methods

- `alias(alias: string | number)`

Set the external identifier for the given attendee.

- `answers(answers: AnswerModel | AnswerModel[])`

Set a relationship which will tell the API to use the given answer model(s) for the attendee when booking an appointment.

- `as(identifier: number)`

Set the identifier for a given attendee.

- `located(details: LocatableDetailParameters)`

Set certain attributes on the attendee related to location details such as address and city.

- `messageable()`

Set a flag on the attendee which determines that they have opted to receive sms messages.

- `named(first: string, last: string)`

Set the first and last name of the attendee.

- `provided(notes: string)`

Set any additional details the attendee has provided when booking an appointment.

- `reachable(details: ReachableDetailParameters)`

Set certain attributes on the attendee related to contact details such as cell phone and email.

- `responses(answers: ResponseModel | ResponseModel[])`

Set a relationship which will tell the API to use the given response model(s) for the attendee when cancelling an appointment.

- `speaks(language: string)`

Set the preferred locale of the attendee.

##### Example

```javascript
import { Attendee, Answer } from 'coconut-open-api-js';

class Attendees {
  static create(attributes) {
    const {
      address, alias, city, country, firstName, lastName,
      notes, phone, email, language, question, value
    } = attributes;

    const answer = (new Answer()).for(question).is(value);

    return (new Attendee())
      .alias(alias)
      .answers(answer)
      .located({ address, city, country })
      .messagable()
      .named(firstName, lastName)
      .provided(notes)
      .reachable({ phone, email })
      .speaks(language);
  }
}
```

### Forms

##### Methods

- `cancellations()`

Set a filter which will tell the API to return only cancellation forms.

- `get()`

Send the API request using the pre-set filters.

- `on(page: number)`

Set the page offset which you want to view.

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `take(limit: number)`

Set the limit which you want returned.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Forms {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ limit, page, sortable }) {
    return await this.api
      .forms()
      .cancellations()
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get()
  }
}
```

### Locations

##### Methods

- `assigned(assigned: boolean = true)`

Set a filter which will tell the API to return locations that have public user and service assignments.

- `containing(user: number | string)`

Set a filter which will tell the API to return locations where the supplied user identifier is assigned.

- `details(identifier: string)`

Retrieve a given location's details based on the given identifier.

- `get()`

Send the API request using the pre-set filters.

- `invitable()`

Set a filter which will tell the API to return locations that are specifically invite only.

- `located(details: LocatableLocationParameters)`

Set certain filters which will tell the API to return locations that match the locatable details you provide.

- `on(page: number)`

Set the page offset which you want to view.

- `physical()`

Set a filter which will tell the API to return only non-virtual locations.

- `providing(services: number | number[] | string | string[])`

Set a filter which will tell the API to return locations where the supplied service identifier(s) is / are assigned.

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `suggest(query: string)`

Retrieve a set of location suggestions based on the given query.

- `supporting(method: number)`

Set a filter which will tell the API to return locations that are supported by the given meeting method.

- `take(limit: number)`

Set the limit which you want returned.

- `through(resource: string)`

Set a filter which will tell the API which resource the request comes from. Currently, only 'client_view' is supported.

- `virtual()`

Set a filter which will tell the API to return only virtual locations.

- `withInviteOnly(inviteOnlyResources?: boolean)`

Set an attribute which will tell the API to allow locations that are invite only or have invite only services or users assigned to them.

- `withinUserCategory(userCategory: number | string)`

Set a filter which will tell the API to return locations where users assigned to it are within the category matching the provided identifier.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Locations {
  constructor() {
    this.api = new OpenApi();
  }

  async details(identifier) {
    return await this.api.details(identifier);
  }

  async get({ page, limit, method, resource, services, sortable, user, userCategory }) {
    return await this.api
      .locations()
      .assigned()
      .containing(user)
      .invitable()
      .providing(services)
      .physical()
      .supporting(method)
      .withInviteOnly()
      .withinUserCategory(userCategory)
      .sortBy(sortable)
      .through(resource)
      .on(page)
      .take(limit)
      .get();
  }

  async suggestions(query) {
    return await this.api.suggest(query);
  }
}
```

### Preferences

##### Methods

- `between(start: string, end: string)`

Set the attributes to determine the start and end time of the wait list request preference.

- `next()`

Set an attribute to say that the preference is for the next available opening.

- `on(day: number)`

Set the attribute to determine the preferred day of the wait list request preference and that it should only be for the certain supplied days.

##### Example

```javascript
import { Preference } from 'coconut-open-api-js';

class Preferences {
  static create({ day, start, end }) {
    return (new Preference()).between(start, end).on(day);
  }
}
```

### Questions

##### Methods

- `for(services: number | number[] | string | string[])`

Set a filter which will tell the API to return questions which are specifically assigned to the given service identifier(s).

- `get()`

Send the API request using the pre-set filters.

- `on(page: number)`

Set the page offset which you want to view.

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `take(limit: number)`

Set the limit which you want returned.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Questions {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ limit, page, services, sortable }) {
    return await this.api
      .questions()
      .for(services)
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get()
  }
}
```

### Responses

##### Methods

- `for(question: number)`

Set an attribute to determine the identifier of the question being answer.

- `is(value: string)`

Set an attribute to determine the actual answer's value.

##### Example

```javascript
import { Response } from 'coconut-open-api-js';

class Responses {
  static create({ question, value }) {
    return (new Response())
      .for(question)
      .is(value);
  }

  static select({ question, option }) {
    return (new Response())
      .for(question)
      .selected(option);
  }
}
```

### Services

##### Methods

- `assigned(assigned: boolean = true)`

Set a filter which will tell the API to return services that have public user and location assignments.

- `at(location: number | string)`

Set a filter which will tell the API to return services that are provided at the location matching the provided identifier.

- `by(user: number | string)`

Set a filter which will tell the API to return services that are provided by the user matching the provided identifier.

- `get()`

Send the API request using the pre-set filters.

- `group()`

Set a filter which will tell the API to return only group type services.

- `in(category: number | string)`

Set a filter which will tell the API to return services that match the given category identifier.

- `individual()`

Set a filter which will tell the API to return only individual type services.

- `invitable()`

Set a filter which will tell the API to return services that are specifically invite only.

- `located(details: LocatableServiceParameters)`

Set certain filters which will tell the API to return services that match the locatable details you provide.

- `on(page: number)`

Set the page offset which you want to view.

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `supporting(method: number)`

Set a filter which will tell the API to return services that are supported by the given meeting method.

- `take(limit: number)`

Set the limit which you want returned.

- `through(resource: string)`

Set a filter which will tell the API which resource the request comes from. Currently, only 'client_view' is supported.

- `withInviteOnly(inviteOnlyResources?: boolean)`

Set an attribute which will tell the API to allow services that are invite only or have invite only locations or users assigned to them.

- `withinUserCategory(userCategory: number | string)`

Set a filter which will tell the API to return services that are provided by user within the category matching the provided identifier.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Services {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ category, limit, location, method, page, region, resource, sortable, user, userCategory }) {
    return await this.api
      .services()
      .assigned()
      .at(location)
      .by(user)
      .in(category)
      .invitable()
      .located({ region })
      .supporting(method)
      .through(resource)
      .withInviteOnly()
      .withinUserCategory(userCategory)
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get()
  }
}
```

### Settings

##### Methods

- `get()`

Send the API request.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Settings {
  constructor() {
    this.api = new OpenApi();
  }

  async get() {
    return await this.api.settings().get();
  }
}
```

### Time Slots

##### Methods

- `at(location: number)`

Set a filter which will tell the API to return time slots at the location matching the provided identifier.

- `attendedBy(users: number | number[])`

Set a filter which will tell the API to return time slots that match availability of the additional user matching the provided identifier.

- `between(start: string, end: string)`

Set a filter which will tell the API to return time slots between a given start and end date time string.

- `by(user: number)`

Set a filter which will tell the API to return time slots that are specifically for the user matching the provided identifier.

- `excluding(exclusion: number)`

Set a filter which will tell the API to exclude a particular appointment identifier when generating availability.

- `for(services: number | number[])`

Set a filter which will tell the API to return time slots that are specifically for the service(s) matching the provided identifier(s).

- `get()`

Send the API request using the pre-set filters.

- `google(token: string)`

Set a filter which will tell the API to return time slots that are not conflicting with events associated with the Google access token.

- `in(timezone: string)`

Set a filter which will tell the API to return time slots in the given timezone.

- `supporting(locales: string[])`

Set a filter which will tell the API to return time slots for users that support the given locales.

- `visibility(visibility: number)`

Set a filter which will tell the API whether to return time slots belonging to all resources or just public resources.

- `withInviteOnly(inviteOnlyResources?: boolean)`

Set an attribute which will tell the API to return time slots belonging to public and invite only resources.

- `withinUserCategory(userCategory: number)`

Set a filter which will tell the API to return time slots that are specifically for users within the category matching the provided identifier.

##### Example

```javascript
import { OpenApi, Visibilities } from 'coconut-open-api-js';

class TimeSlots {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ appointment, end, location, service, start, token, user, userCategory, users }) {
    return await this.api
      .slots()
      .at(location)
      .attendedBy(users)
      .by(user)
      .for(service)
      .google(token)
      .between(start, end)
      .excluding(appointment)
      .in('America/Chicago')
      .supporting(['en', 'fr', 'es'])
      .visibility(Visibilities.ALL)
      .withInviteOnly()
      .withinUserCategory(userCategory)
      .get()
  }
}
```

### Users

##### Methods

- `assigned(assigned: boolean = true)`

Set a filter which will tell the API to return users that have public location and service assignment.

- `at(location: number | string)`

Set a filter which will tell the API to return users that are assigned at the location matching the provided identifier.

- `find(user: number | string)`

Set a filter which will tell the API to return a user matching the provided identifier.

- `get()`

Send the API request using the pre-set filters.

- `located(details: LocatableUserParameters)`

Set certain filters which will tell the API to return users that match the locatable details you provide.

- `on(page: number)`

Set the page offset which you want to view.

- `performing(services: number | number[] | string | string[])`

Set a filter which will tell the API to return users that are assigned to the service(s) matching the provided identifier(s).

- `sortBy(sortable: string)`

Set a sorting string to determine how the returned results are sorted.

- `supporting(method: number)`

Set a filter which will tell the API to return users that support the given meeting method.

- `take(limit: number)`

Set the limit which you want returned.

- `through(resource: string)`

Set a filter which will tell the API which resource the request comes from. Currently, only 'client_view' is supported.

- `withInviteOnly(inviteOnlyResources?: boolean)`

Set an attribute which will tell the API to allow users that are invite only or have invite only locations or services assigned to them.

- `withinLocationCategory(locationCategory?: number | string)`

Set a filter which will tell the API to return users that are specifically for users within the location category matching the provided identifier.

- `withinUserCategory(userCategory?: number | string)`

Set a filter which will tell the API to return users that are specifically for users within the user category matching the provided identifier.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class Users {
  constructor() {
    this.api = new OpenApi();
  }

  async get({ limit, location, method, page, region, resource, services, sortable }) {
    return await this.api
      .users()
      .assigned()
      .at(location)
      .located({ region })
      .performing(services)
      .supporting(method)
      .through(resource)
      .withInviteOnly()
      .on(page)
      .sortBy(sortable)
      .take(limit)
      .get();
  }
}
```

### Wait Lists

##### Methods

- `add()`

Create a new wait list request using the pre-set parameters.

- `at(location: number | string)`

Set a relationship which will tell the API to use the given location identifier when creating or updating a wait list request.

- `belonging(client: number | string)`

Set a parameter which will tell the API to use the given client identifier when looking for an existing wait list request.

- `find(list: number | string)`

Find an existing wait list request matching the given identifier.

- `for(attendee: AttendeeModel)`

Set a relationship which will tell the API to use the given attendee model when creating or updating a wait list request.

- `include(includes: string)`

Set an inclusion parameter to include other relationships when fetching an existing wait list request.

- `prefers(preferences: PreferenceModel | PreferenceModel[])`

Set a relationship which will tell the API to use the given preference model(s) when creating or updating a wait list request.

- `provided(notes: string)`

Set an attribute which will tell the API to use the given notes as additional details when creating or updating a wait list request.

- `remove(list: number | string)`

Remove a pre-set client's wait list request that matches the given identifier.

- `seeking(service: number | string)`

Set a relationship which will tell the API to use the service identifier when creating or updating a wait list request.

- `update(list: number | string)`

Update the wait list request matching the given identifier with pre-set attributes / relationships.

- `with(user: number | string)`

Set a relationship which will tell the API to use the user identifier when creating or updating a wait list request.

##### Example

```javascript
import { OpenApi, Attendee, Preference } from 'coconut-open-api-js';

class WaitLists {
  constructor() {
    this.api = new OpenApi();
  }

  async add({ firstName, lastName, email, day, start, end, location, service, user, notes }) {
    const attendee = (new Attendee()).named({ firstName, lastName }).reachable({ email });
    const preference = (new Preference()).on(day).between(start, end);

    return this.api
      .lists()
      .for(attendee)
      .at(location)
      .seeking(service)
      .with(user)
      .provided(notes)
      .prefers(preference)
      .add();
  }

  async find({ client, inclusions, list }) {
    return this.api
      .lists()
      .belonging(client)
      .include(inclusions)
      .find(list);
  }

  async remove({ client, list }) {
    return this.api.lists().belonging(client).remove(list);
  }

  async update({ client, list, notes, user }) {
    const preference = (new Preference()).next();

    return this.api
      .lists()
      .belonging(client)
      .with(user)
      .prefers(preference)
      .provided(notes)
      .update(list);
  }
}
```

### Wait Times

##### Methods

- `at(location: number | string)`

Set a relationship which will tell the API to use the given location identifier when fetching wait times.

- `get()`

Find wait times matching the pre-set matching parameters.

- `on(page: number)`

Set the page offset which you want to view.

- `take(limit: number)`

Set the limit which you want returned.

##### Example

```javascript
import { OpenApi } from 'coconut-open-api-js';

class WaitTimes {
  constructor() {
    this.api = new OpenApi();
  }

  async all() {
    return this.api.waitTimes().get();
  }

  async find({ location }) {
    return this.api.waitTimes().at(location).get();
  }
}
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Testing

```bash
$ yarn run test
```

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[ico-version]: https://img.shields.io/npm/v/coconut-open-api-js.svg?style=flat-square
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
[ico-travis]: https://img.shields.io/travis/coconutcalendar/coconut-open-api-js/master.svg?style=flat-square
[ico-codecov]: https://codecov.io/gh/coconutcalendar/coconut-open-api-js/branch/master/graph/badge.svg
[ico-downloads]: https://img.shields.io/npm/dt/coconut-open-api-js.svg?style=flat-square

[link-npm]: https://www.npmjs.org/package/coconut-open-api-js
[link-travis]: https://travis-ci.org/coconutcalendar/coconut-open-api-js
[link-codecov]: https://codecov.io/gh/coconutcalendar/coconut-open-api-js
[link-downloads]: http://npm-stat.com/charts.html?package=coconut-open-api-js
[link-developers]: https://developers.coconutsoftware.com/docs/v2/api/open-appointments
