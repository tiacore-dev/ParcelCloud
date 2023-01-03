import { createBrowserHistory, Path, LocationState, LocationDescriptorObject } from "history";

export const history = createBrowserHistory();

export const goBack = () => history.goBack();

export const pushPath = (path: Path, state?: LocationState) => history.push(path, state)

export const pushLocation = (location: LocationDescriptorObject<LocationState>) => history.push(location)

export const replacePath = (path: Path, state?: LocationState) => history.replace(path, state)

export const replaceLocation = (location: LocationDescriptorObject<LocationState>) => history.replace(location)

 
