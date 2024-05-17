import { injectable } from "inversify";
import { Alert } from "react-native";

@injectable()
export class ErrorAlertingService {
  alert(title: string, message?: string) {
    // TODO: decouple this and have a custom UI component for alerts
    Alert.alert(title, message);
  }
}
