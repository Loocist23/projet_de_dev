#include <windows.h>
#include <CommCtrl.h>

const char* CLASS_NAME = "MyWindowClass";
HWND g_hTextbox; // Handle du contrôle de zone de texte

LRESULT WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_CREATE:
            // Créer le contrôle de zone de texte
            g_hTextbox = CreateWindowExA(0, "EDIT", "", WS_CHILD | WS_VISIBLE | WS_BORDER | ES_AUTOHSCROLL,
                                         10, 50, 200, 25, hwnd, NULL, NULL, NULL);
            break;

        case WM_COMMAND:
            if (HIWORD(wParam) == EN_CHANGE) {
                // Le contenu du contrôle de zone de texte a changé
                char buffer[256];
                GetWindowTextA(g_hTextbox, buffer, 256);
                // Faites quelque chose avec le contenu du contrôle de zone de texte ici
                // Par exemple, vous pouvez l'afficher dans la console
                OutputDebugStringA(buffer); // Affiche le texte dans la fenêtre de sortie (sortie de débogage)
            }
            break;

        case WM_PAINT:
        {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(hwnd, &ps);
            TextOutA(hdc, 10, 10, "Hello, World!", 13);
            EndPaint(hwnd, &ps);
        }
            return 0;

        case WM_DESTROY:
            PostQuitMessage(0);
            return 0;

        default:
            return DefWindowProc(hwnd, uMsg, wParam, lParam);
    }
    return 0;
}

int WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    // Register the window class
    WNDCLASS wc = { 0 };
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME;
    RegisterClass(&wc);

    // Register la classe de la zone de texte
    INITCOMMONCONTROLSEX icex;
    icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
    icex.dwICC = ICC_STANDARD_CLASSES;
    InitCommonControlsEx(&icex);

    // Create the window
    HWND hwnd = CreateWindowExA(
            0,                      // Optional window styles
            CLASS_NAME,             // Window class
            "Window Title",         // Window text
            WS_OVERLAPPEDWINDOW,    // Window style

            // Size and position
            CW_USEDEFAULT, CW_USEDEFAULT, 300, 200,

            NULL,       // Parent window
            NULL,       // Menu
            hInstance,  // Instance handle
            NULL        // Additional application data
    );

    if (hwnd == NULL) {
        return 0;
    }

    // Display the window
    ShowWindow(hwnd, nCmdShow);

    // Enter the message loop
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return static_cast<int>(msg.wParam);
}
