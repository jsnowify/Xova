<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
    'nickname' => 'required|string|max:255',
    'username' => 'required|string|max:255|unique:'.User::class, // Ensure username is unique
    'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
    'password' => ['required', 'confirmed', Rules\Password::defaults()],
    'role' => 'required|string|max:50', // Example: 'user', 'editor'. You might use an Enum or 'in:user,admin' rule.
]);

        // 2. User Creation
        $user = User::create([
            'nickname' => $validatedData['nickname'],
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'role' => $validatedData['role'], // Or set a default role here, e.g., 'user'
            'password' => Hash::make($validatedData['password']),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
