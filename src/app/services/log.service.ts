//логування дій

export class LogService{

    /**
     * виводить деяке повідомлення в консоль
     * @param logMessage
     */
    write(logMessage: string) {
        console.log(logMessage);
    }
}