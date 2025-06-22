import { generateQRCode } from '~/lib/generate.ticket.qr';
import { supabase } from '~/lib/supabase';
import { qrlog } from '~/logger';
import { EventRegistrationInsert } from '~/types/register.type';

/**
 * Registers a user for an event and generates a ticket
 * @param eventId - The ID of the event to register for
 * @param userId - The ID of the user registering
 * @returns Promise<{registrationId: string, code: string, newRegistration: boolean}>
 * @throws Error if registration fails
 */
export async function registerForEvent(
  eventId: string,
  userId: string
): Promise<{ registrationId: string; code: string; newRegistration: boolean }> {
  try {
    // 1. Verify the event exists and registration is open
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id, registration_status')
      .eq('id', eventId)
      .single();

    if (eventError) {
      throw new Error('Event not found');
    }
    if (event.registration_status !== 'Open') {
      throw new Error('Event registration is closed');
    }

    // 2. Check if user is already registered
    const { data: existingRegistration, error: existingError } = await supabase
      .from('events_registrations')
      .select('id,code')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .maybeSingle();

    if (existingError) {
      throw existingError;
    }
    if (existingRegistration) {
      // Generate ticket for existing registration
      await generateTicketForRegistration(
        existingRegistration.id,
        existingRegistration.code,
        userId
      );
      return {
        registrationId: existingRegistration.id,
        code: existingRegistration.code,
        newRegistration: false,
      };
    }

    // 3. Create the registration record
    const registrationData: EventRegistrationInsert = {
      event_id: eventId,
      user_id: userId,
      status: false,
    };

    const { data: registration, error: registrationError } = await supabase
      .from('events_registrations')
      .insert(registrationData)
      .select('id, code')
      .single();

    if (registrationError) {
      throw registrationError;
    }
    if (!registration) {
      throw new Error('Failed to create registration');
    }

    // Generate ticket for new registration
    await generateTicketForRegistration(
      registration.id,
      registration.code,
      userId
    );

    return {
      registrationId: registration.id,
      code: registration.code,
      newRegistration: true,
    };
  } catch (error) {
    console.error('Registration failed:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Registration failed'
    );
  }
}

/**
 * Helper function to generate ticket for a registration
 */
async function generateTicketForRegistration(
  qrId: string,
  qrCode: string,
  userId: string
) {
  try {
    const resultData = await generateQRCode({
      qrId,
      qrCode,
      userId,
    });

    if (!resultData.exists && resultData.publicUrl) {
      qrlog.warn('🎟️ Ticket already exists, URL:', resultData.publicUrl);
      return;
    }

    if (resultData.exists && resultData.publicUrl) {
      qrlog.data('✅ Ticket generated, URL:', resultData.publicUrl);
    } else {
      qrlog.error('❌ No Ticket URL returned', null);
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Error generating ticket';
    qrlog.error('🚨 Error generating Ticket:', message);
    // Note: We don't throw here because ticket generation failure shouldn't fail the registration
  }
}
