import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { PC_PARTS } from '@/lib/pc-parts';

export async function GET() {
    const supabase = getServiceSupabase();
    try {
        // 1. Check if data already exists to avoid duplicates
        const { count, error: countError } = await supabase
            .from('pc_parts')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        if (count && count > 0) {
            return NextResponse.json({ message: 'Database already seeded', count });
        }

        // 2. Insert data
        const { data, error } = await supabase
            .from('pc_parts')
            .insert(PC_PARTS);

        if (error) throw error;

        return NextResponse.json({ message: 'Successfully seeded PC parts', count: PC_PARTS.length });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
