"use client"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatePropertyRequest } from "../types/Property";
import { usePathname, useRouter } from "next/navigation";
import { Dictionary } from "../types/DictionaryType";


export function CreateUpdatePropertyForm(onSubmit: (e: React.FormEvent) => Promise<void>, form: CreatePropertyRequest, setForm: React.Dispatch<React.SetStateAction<CreatePropertyRequest>>, loading: boolean, dict: Dictionary) {
    const router = useRouter();
    const pathname = usePathname();
    const isEdit = pathname.includes("/edit/");

    return <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        {/* <div className="w-full max-w-sm"> */}
        <div className="w-full max-w-md">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{isEdit ?
                        dict.property.updatePropertyPageTitle :
                        dict.property.createPropertyPageTitle
                    }</CardTitle>
                    <CardDescription>
                        {/* List your commercial or residential property from the comfort of your couch */}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <FieldGroup>
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="name">
                                            {dict.property.name}
                                        </FieldLabel>
                                        <Input
                                            id="name" value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Property name" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="builder">
                                            {dict.property.builder}
                                        </FieldLabel>
                                        <Input
                                            id="builder" value={form.builder}
                                            onChange={e => setForm({ ...form, builder: e.target.value })} placeholder="Builder" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="price">
                                            {dict.property.price}
                                        </FieldLabel>
                                        <Input
                                            id="price" type="number" value={form.price}
                                            onChange={e =>
                                                setForm({ ...form, price: parseFloat(e.target.value) })
                                            } placeholder="Price" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="location">
                                            {dict.property.location}
                                        </FieldLabel>
                                        <Input
                                            id="location" value={form.location}
                                            onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location" required />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="description">
                                            {dict.property.description}
                                        </FieldLabel>
                                        <Textarea
                                            id="description" value={form.description}
                                            onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="imgUrl">
                                            {dict.property.images}
                                        </FieldLabel>
                                        <Textarea
                                            id="imgUrl" value={form.images || ''}
                                            onChange={e => setForm({ ...form, images: e.target.value })} placeholder="Image Urls" />
                                        <FieldDescription>
                                            Enter comma seperated image urls
                                        </FieldDescription>
                                    </Field>

                                    {/* <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
                                        {loading ? 'Saving...' : 'Create Property'}
                                        </button> */}

                                </FieldGroup>
                            </FieldSet>
                            <FieldSeparator />

                            <Field orientation="horizontal" className='items-center justify-center'>
                                <Button variant={'outline'} disabled={loading}>
                                    {
                                        isEdit?
                                            loading ? `${dict.button.edit}...` : dict.button.save
                                        :
                                            loading ? `${dict.button.save}...` : dict.button.createProperty

                                    }
                                    {/* {loading ? `${dict.button.save}...` : dict.button.createProperty}</Button> */}
                                </Button>
                                {/* <button
                                    type="submit"
                                    disabled={updating}
                                    className={`w-full py-2 rounded text-white ${updating
                                        ? 'bg-green-600 cursor-not-allowed'
                                        : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    {updating ? 'Updating...' : 'Update Property'}
                                </button> */}
                                <Button variant="outline" type="button" onClick={() => { router.back() }}>
                                    Cancel
                                </Button>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>;
}